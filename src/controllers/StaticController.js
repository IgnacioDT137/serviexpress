export const renderIndex = async (req, res) => {
    if (!req.session.logueado) {
        return res.redirect("/login")
    }
    const titulo = "Inicio"
    return res.render("index", {title: titulo})
}

export const renderNosotros = async (req, res) => {
    const titulo = "Nosotros"
    return res.render("nosotros", {title: titulo})
}

export const renderContacto = async (req, res) => {
    const titulo = "Contacto"
    return res.render("contacto", {title: titulo})
}
