module.exports = {
  'Create New Post' : function (client) {
    client
      .url('http://localhost:3000/posts/create')
      .waitForElementVisible('body', 1000)
      .setValue('input[name=title]', 'Test Title')
      .setValue('textarea[name=content]', 'Test Content')
      .click('button[type=submit]')
      .pause(1000)
      .assert.containsText('td:nth-of-type(1)', 'Test Title')
      .assert.containsText('td:nth-of-type(2)', 'Test Content')
      .end()
  }
}
