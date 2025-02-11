import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import Tag from '#models/tag';
import User from '#models/user';

test.group('Tags', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction());

  test('it should return the list of tags', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234' });

    const response = await client.get('/tags').loginAs(user);

    response.assertStatus(200);
    response.assertBody([]);
  });

  test('it should create a new tag', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234' });
    const tagName = 'Important';

    const response = await client
      .post('/tags')
      .json({
        name: tagName,
      })
      .loginAs(user);

    response.assertStatus(201);
    response.assertBodyContains({
      name: tagName,
    });
  });

  test('it should get a tag by id', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234' });
    const tag = await Tag.create({ name: 'Urgent' });

    const getResponse = await client.get(`/tags/${tag.uuid}`).loginAs(user);

    getResponse.assertStatus(200);
    getResponse.assertBodyContains({
      uuid: tag.uuid,
      name: tag.name,
    });
  });

  test('it should update a tag', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234' });
    const tag = await Tag.create({ name: 'Work' });

    const newName = 'Personal';
    const patchResponse = await client
      .patch(`/tags/${tag.uuid}`)
      .json({
        name: newName,
      })
      .loginAs(user);

    patchResponse.assertStatus(200);
    patchResponse.assertBodyContains({
      uuid: tag.uuid,
      name: newName,
    });
  });

  test('it should delete a tag', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234' });
    const tag = await Tag.create({ name: 'Hobby' });

    const deleteResponse = await client.delete(`/tags/${tag.uuid}`).loginAs(user);
    deleteResponse.assertStatus(204);
  });
});
