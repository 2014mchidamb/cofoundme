AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/users/login',
	layoutTemplate: 'accountsLayout',
});
AccountsTemplates.configureRoute('signUp', {
	name: 'signup',
	path: '/users/signup',
	layoutTemplate: 'accountsLayout',
});
AccountsTemplates.addFields([
    {
		_id: 'name',
        type: 'text',
		required: true,
        displayName: "Name",
    },
    {
		_id: 'school',
        type: 'text',
		required: true,
        displayName: "School",
    }
]);
