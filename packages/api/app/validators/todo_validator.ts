import vine, { SimpleMessagesProvider } from '@vinejs/vine';

import Project from '#models/project';
import Status from '#models/status';
import Tag from '#models/tag';

export const createSchema = vine.compile(
	vine.object({
		name: vine.string().minLength(3).maxLength(255),
		description: vine.string().nullable(),
		statusId: vine.number().exists(async (_, value) => {
			const row = await Status.find(value);
			return row !== null;
		}),
		projectId: vine.number().exists(async (_, value) => {
			const row = await Project.find(value);
			return row !== null;
		}),
		tagId: vine.number().exists(async (_, value) => {
			const row = await Tag.find(value);
			return row !== null;
		}),
	}),
);

createSchema.messagesProvider = new SimpleMessagesProvider({
	'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
	'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
});

export const updateSchema = vine.compile(
	vine.object({
		name: vine.string().minLength(3).maxLength(255).optional(),
		description: vine.string().nullable().optional(),
		statusId: vine
			.number()
			.exists(async (_, value) => {
				const row = await Status.find(value);
				return row !== null;
			})
			.optional(),
    tagId: vine.number().exists(async (_, value) => {
      const row = await Tag.find(value);
      return row !== null;
    }),
		completed: vine.boolean().optional(),
	}),
);

updateSchema.messagesProvider = new SimpleMessagesProvider({
	'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
	'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
});
