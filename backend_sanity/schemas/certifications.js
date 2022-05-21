export default {
	id: Math.random(),
	name: "certifications",
	title: "Certifications",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},

		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "certificationLink",
			title: "Certification Link",
			type: "string",
		},
		{
			name: "imgUrl",
			title: "ImageUrl",
			type: "image",
			options: {
				hotspot: true,
			},
		},

		{
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				{
					name: "tag",
					title: "Tag",
					type: "string",
				},
			],
		},
	],
};
