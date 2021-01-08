function onlyUsersCanAccess(request, response, next) {
    if(!request.session.user_id) {
        return response.redirect('/admin')
    }

    next()
}

function redirectToAdminDashboard(request, response, next) {
    if(request.session.user_id) {
        return response.redirect('/admin/recipes')
    }

    next()
}

module.exports = {
    redirectToAdminDashboard,
    onlyUsersCanAccess
}