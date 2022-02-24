export default {
	name: "testimonials",
	title: "Testimonials",
	type: "document",
	fields: [
		{ name: "name", title: "Name", type: "string" },
		{ name: "company", title: "Comapany", type: "string" },
		{
			name: "imageurl",
			title: "ImgURL",
			type: "image",
			// user can choose crop when uploading img
			options: { hotspot: true },
		},
		{ name: "feedback", title: "Feedback", type: "string" },
	],
};
