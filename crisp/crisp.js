#!/usr/bin/env node
/**
 * Crisp CLI - Manage live chat conversations
 * 
 * Usage:
 *   node crisp.js list [--status pending|resolved|all] [--limit 20]
 *   node crisp.js read <session_id>
 *   node crisp.js reply <session_id> "message"
 *   node crisp.js resolve <session_id>
 *   node crisp.js reopen <session_id>
 *   node crisp.js search "query"
 *   node crisp.js info <session_id>
 */

const https = require('https');

// Config from environment
const IDENTIFIER = process.env.CRISP_IDENTIFIER;
const KEY = process.env.CRISP_KEY;
const WEBSITE_ID = process.env.CRISP_WEBSITE_ID;

if (!IDENTIFIER || !KEY || !WEBSITE_ID) {
  console.error('Error: Missing environment variables.');
  console.error('Required: CRISP_IDENTIFIER, CRISP_KEY, CRISP_WEBSITE_ID');
  console.error('\nSee SKILL.md for setup instructions.');
  process.exit(1);
}

// Base64 encode for Basic Auth
const AUTH = Buffer.from(`${IDENTIFIER}:${KEY}`).toString('base64');

/**
 * Make API request to Crisp
 */
function apiRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.crisp.chat',
      port: 443,
      path: `/v1${path}`,
      method: method,
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'X-Crisp-Tier': 'plugin',
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(`API Error: ${json.reason || json.error}`));
          } else {
            resolve(json.data);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

/**
 * List conversations
 */
async function listConversations(status = 'all', limit = 20) {
  let path = `/website/${WEBSITE_ID}/conversations/${limit}`;
  if (status === 'pending') {
    path = `/website/${WEBSITE_ID}/conversations/${limit}?filter_unread=1&filter_not_resolved=1`;
  } else if (status === 'resolved') {
    path = `/website/${WEBSITE_ID}/conversations/${limit}?filter_resolved=1`;
  }
  
  const conversations = await apiRequest('GET', path);
  
  if (!conversations || conversations.length === 0) {
    console.log('No conversations found.');
    return;
  }

  console.log(`\n📬 Conversations (${conversations.length}):\n`);
  
  for (const conv of conversations) {
    const meta = conv.meta || {};
    const name = meta.nickname || meta.email || 'Unknown';
    const status = conv.state || 'unknown';
    const unread = conv.unread?.operator || 0;
    const lastMsg = conv.last_message ? new Date(conv.updated_at * 1000).toLocaleString() : 'N/A';
    
    const statusIcon = status === 'resolved' ? '✅' : (unread > 0 ? '🔴' : '💬');
    
    console.log(`${statusIcon} ${name}`);
    console.log(`   ID: ${conv.session_id}`);
    console.log(`   Status: ${status} | Unread: ${unread} | Last: ${lastMsg}`);
    if (conv.last_message) {
      const preview = conv.last_message.substring(0, 60) + (conv.last_message.length > 60 ? '...' : '');
      console.log(`   Preview: "${preview}"`);
    }
    console.log('');
  }
}

/**
 * Read conversation messages
 */
async function readConversation(sessionId) {
  const messages = await apiRequest('GET', `/website/${WEBSITE_ID}/conversation/${sessionId}/messages`);
  
  if (!messages || messages.length === 0) {
    console.log('No messages in this conversation.');
    return;
  }

  console.log(`\n💬 Conversation ${sessionId}:\n`);
  
  // Reverse to show oldest first
  for (const msg of messages.reverse()) {
    const time = new Date(msg.timestamp * 1000).toLocaleString();
    const from = msg.from === 'user' ? '👤 Customer' : '🤖 Agent';
    const content = msg.content || '[no content]';
    
    console.log(`[${time}] ${from}:`);
    if (typeof content === 'string') {
      console.log(`  ${content}`);
    } else if (content.text) {
      console.log(`  ${content.text}`);
    } else {
      console.log(`  [${msg.type || 'message'}]`);
    }
    console.log('');
  }
}

/**
 * Reply to conversation
 */
async function replyToConversation(sessionId, message) {
  await apiRequest('POST', `/website/${WEBSITE_ID}/conversation/${sessionId}/message`, {
    type: 'text',
    from: 'operator',
    origin: 'chat',
    content: message,
  });
  
  console.log(`✅ Message sent to conversation ${sessionId}`);
}

/**
 * Resolve conversation
 */
async function resolveConversation(sessionId) {
  await apiRequest('PATCH', `/website/${WEBSITE_ID}/conversation/${sessionId}/state`, {
    state: 'resolved',
  });
  
  console.log(`✅ Conversation ${sessionId} marked as resolved`);
}

/**
 * Reopen conversation
 */
async function reopenConversation(sessionId) {
  await apiRequest('PATCH', `/website/${WEBSITE_ID}/conversation/${sessionId}/state`, {
    state: 'pending',
  });
  
  console.log(`✅ Conversation ${sessionId} reopened`);
}

/**
 * Search conversations
 */
async function searchConversations(query) {
  const results = await apiRequest('GET', `/website/${WEBSITE_ID}/conversations/search?search_query=${encodeURIComponent(query)}`);
  
  if (!results || results.length === 0) {
    console.log(`No results for "${query}"`);
    return;
  }

  console.log(`\n🔍 Search results for "${query}" (${results.length}):\n`);
  
  for (const conv of results) {
    const meta = conv.meta || {};
    const name = meta.nickname || meta.email || 'Unknown';
    console.log(`💬 ${name}`);
    console.log(`   ID: ${conv.session_id}`);
    console.log('');
  }
}

/**
 * Get conversation info
 */
async function getConversationInfo(sessionId) {
  const info = await apiRequest('GET', `/website/${WEBSITE_ID}/conversation/${sessionId}`);
  
  console.log(`\n📋 Conversation Info:\n`);
  console.log(`Session ID: ${info.session_id}`);
  console.log(`State: ${info.state}`);
  console.log(`Created: ${new Date(info.created_at * 1000).toLocaleString()}`);
  console.log(`Updated: ${new Date(info.updated_at * 1000).toLocaleString()}`);
  
  if (info.meta) {
    console.log(`\n👤 Customer:`);
    if (info.meta.nickname) console.log(`   Name: ${info.meta.nickname}`);
    if (info.meta.email) console.log(`   Email: ${info.meta.email}`);
    if (info.meta.phone) console.log(`   Phone: ${info.meta.phone}`);
    if (info.meta.ip) console.log(`   IP: ${info.meta.ip}`);
    if (info.meta.device) console.log(`   Device: ${JSON.stringify(info.meta.device)}`);
  }
  
  if (info.unread) {
    console.log(`\n📬 Unread: ${info.unread.operator || 0} (operator), ${info.unread.visitor || 0} (visitor)`);
  }
}

/**
 * Parse arguments and run
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'list': {
        let status = 'all';
        let limit = 20;
        for (let i = 1; i < args.length; i++) {
          if (args[i] === '--status' && args[i + 1]) {
            status = args[++i];
          } else if (args[i] === '--limit' && args[i + 1]) {
            limit = parseInt(args[++i], 10);
          }
        }
        await listConversations(status, limit);
        break;
      }
      
      case 'read': {
        const sessionId = args[1];
        if (!sessionId) {
          console.error('Usage: node crisp.js read <session_id>');
          process.exit(1);
        }
        await readConversation(sessionId);
        break;
      }
      
      case 'reply': {
        const sessionId = args[1];
        const message = args.slice(2).join(' ');
        if (!sessionId || !message) {
          console.error('Usage: node crisp.js reply <session_id> "message"');
          process.exit(1);
        }
        await replyToConversation(sessionId, message);
        break;
      }
      
      case 'resolve': {
        const sessionId = args[1];
        if (!sessionId) {
          console.error('Usage: node crisp.js resolve <session_id>');
          process.exit(1);
        }
        await resolveConversation(sessionId);
        break;
      }
      
      case 'reopen': {
        const sessionId = args[1];
        if (!sessionId) {
          console.error('Usage: node crisp.js reopen <session_id>');
          process.exit(1);
        }
        await reopenConversation(sessionId);
        break;
      }
      
      case 'search': {
        const query = args.slice(1).join(' ');
        if (!query) {
          console.error('Usage: node crisp.js search "query"');
          process.exit(1);
        }
        await searchConversations(query);
        break;
      }
      
      case 'info': {
        const sessionId = args[1];
        if (!sessionId) {
          console.error('Usage: node crisp.js info <session_id>');
          process.exit(1);
        }
        await getConversationInfo(sessionId);
        break;
      }
      
      default:
        console.log(`
Crisp CLI - Manage live chat conversations

Commands:
  list [--status pending|resolved|all] [--limit N]  List conversations
  read <session_id>                                  Read conversation messages
  reply <session_id> "message"                       Send a reply
  resolve <session_id>                               Mark as resolved
  reopen <session_id>                                Reopen conversation
  search "query"                                     Search conversations
  info <session_id>                                  Get conversation details

Environment variables required:
  CRISP_IDENTIFIER   Your Crisp plugin identifier
  CRISP_KEY          Your Crisp plugin key
  CRISP_WEBSITE_ID   Your website ID
        `);
        break;
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
