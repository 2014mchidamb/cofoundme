AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false, // change to true for prod
    lowercaseUsername: false
});
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
AccountsTemplates.configureRoute('ensureSignedIn', {
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
    },
    {
        _id: 'skills',
        type: 'text',
        required: false,
        displayName: "Skills",
    },
    {
        _id: 'seeking',
        type: 'checkbox',
        required: false,
        displayName: "Looking to Join a Project"
    },
    {
        _id: 'owner_of',
        type: 'hidden'
    },
    {
        _id: 'cofounder_of',
        type: 'hidden'
    },
    {
        _id: 'member_of',
        type: 'hidden'
    }
]);
