Projects = new Mongo.Collection("projects");
Projects.attachSchema(new SimpleSchema({
	name:{
		type: String,
		label: "Project Name",
		max: 100
	},
	school_name:{
		type: String,
		label: "School",
		max: 100
	},
	founders_name:{
		type: [String],
		label: "Founders"
	},
	description:{
		type: String,
		label: "Project Description",
		max: 1000
	},
	tech_stack:{
		type: [String],
		label: "Technologies Used",
		max: 50
	},
	skills_wanted:
	{
		type: [String],
		label: "Looking for Programmers with these skills",
		max: 50
	},
	date_created:{
		type: Date,
		label: "Date Project was Created",
		optional: false
	},
	date_last_updated:{
		type: Date,
		label: "Date Project was Last Updated",
		optional: true
	}
}));