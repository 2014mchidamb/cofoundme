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
