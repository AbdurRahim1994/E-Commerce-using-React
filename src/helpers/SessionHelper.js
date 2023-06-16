class SessionHelper {
    SetToken(token) {
        localStorage.setItem("E-Token", token)
    }

    GetToken() {
        return localStorage.getItem("E-Token")
    }

    SetUserDetail(user) {
        localStorage.setItem("E-Detail", JSON.stringify(user))
    }

    GetUserDetail() {
        return JSON.parse(localStorage.getItem("E-Detail"))
    }

    RemoveUser() {
        localStorage.removeItem("E-Token")
        localStorage.removeItem("E-Detail")
        window.location.href = '/'
    }
}

export const { SetToken, GetToken, SetUserDetail, GetUserDetail, RemoveUser } = new SessionHelper()