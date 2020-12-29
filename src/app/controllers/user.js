module.exports = {
    index(request, response) {
        return response.render('admin/users/index', {
            users_page: true
        })
    },

    create(request, response) {
        return response.render('admin/users/create', {
            users_page: true
        })
    }
}