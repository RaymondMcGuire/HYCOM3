'use strict';

AV.Cloud.define('auth:getCurrentProfile', async (request) => {
  const currentUser = request.currentUser;
  if (!currentUser) {
    throw new AV.Cloud.Error('Unauthorized', { code: 401 });
  }

  const username = currentUser.get('username');
  const authValue = currentUser.get('auth');
  const role = authValue === 'S' ? 'admin' : 'developer';

  const userInfoQuery = new AV.Query('UsrInfo');
  userInfoQuery.equalTo('username', username);
  const userInfo = await userInfoQuery.first({ useMasterKey: true });

  return {
    username,
    role,
    avatar: userInfo ? userInfo.get('usericon') : undefined,
    intro: role === 'admin' ? '超级用户' : '开发者'
  };
});

AV.Cloud.define('profile:upsertCurrentUser', async (request) => {
  const currentUser = request.currentUser;
  if (!currentUser) {
    throw new AV.Cloud.Error('Unauthorized', { code: 401 });
  }

  const username = currentUser.get('username');
  const work = request.params.work || currentUser.get('job') || '';
  const level = request.params.level || currentUser.get('title') || '';

  const query = new AV.Query('UsrInfo');
  query.equalTo('username', username);
  let userInfo = await query.first({ useMasterKey: true });

  if (!userInfo) {
    userInfo = new AV.Object('UsrInfo');
  }

  userInfo.set('username', username);
  userInfo.set('job', work);
  userInfo.set('title', level);

  await userInfo.save(null, { useMasterKey: true });
  return { ok: true };
});

AV.Cloud.define('admin:listUsers', async (request) => {
  const currentUser = request.currentUser;
  if (!currentUser || currentUser.get('auth') !== 'S') {
    throw new AV.Cloud.Error('Forbidden', { code: 403 });
  }

  const query = new AV.Query('UsrInfo');
  query.ascending('username');
  const results = await query.find({ useMasterKey: true });

  return {
    items: results.map((item) => ({
      username: item.get('username') || '',
      job: item.get('job') || '',
      title: item.get('title') || '',
      usericon: item.get('usericon') || undefined,
      role: item.get('auth') || undefined
    }))
  };
});

AV.Cloud.define('admin:listFeedback', async (request) => {
  const currentUser = request.currentUser;
  if (!currentUser || currentUser.get('auth') !== 'S') {
    throw new AV.Cloud.Error('Forbidden', { code: 403 });
  }

  const query = new AV.Query('MailForms');
  query.descending('createdAt');
  const results = await query.find({ useMasterKey: true });

  return {
    items: results.map((item) => ({
      title: item.get('title') || '',
      to_name: item.get('to_name') || '',
      email_address: item.get('email_address') || '',
      message: item.get('message') || ''
    }))
  };
});
