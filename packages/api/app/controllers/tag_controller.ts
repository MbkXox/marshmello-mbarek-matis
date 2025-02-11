import { HttpContext } from '@adonisjs/core/http';

import Tag from '#models/tag';
import { createTagSchema, editTagSchema } from '#validators/tag_validator';

export default class TagController {
  async index({ auth, response }: HttpContext) {
    if (auth.use('web').isLoggedOut) {
      return response.unauthorized();
    }

    const tags = await Tag.all();

    return response.json(tags.map((t) => t.serialize()));
  }

  async show({ auth, params, response }: HttpContext) {
    if (auth.use('web').isLoggedOut) {
      return response.unauthorized();
    }

    const tag = await Tag.findByOrFail({
      uuid: params.uuid,
    });

    return response.json(tag.serialize());
  }

  async store({ auth, request, response }: HttpContext) {
    if (auth.use('web').isLoggedOut) {
      return response.unauthorized();
    }

    const payload = await request.validateUsing(createTagSchema);
    const tag = await Tag.create(payload);

    return response.created(tag.serialize());
  }

  async update({ auth, params, request, response }: HttpContext) {
    if (auth.use('web').isLoggedOut) {
      return response.unauthorized();
    }

    const tag = await Tag.findByOrFail({
      uuid: params.uuid,
    });

    const payload = await request.validateUsing(editTagSchema);
    await tag.merge(payload).save();

    return response.json(tag.serialize());
  }

  async destroy({ auth, params, response }: HttpContext) {
    if (auth.use('web').isLoggedOut) {
      return response.unauthorized();
    }

    const tag = await Tag.findByOrFail({
      uuid: params.uuid,
    });

    await tag.delete();

    return response.noContent();
  }
}
