export const checkRolesSection = (page, section, permission) => {
    if (permission) {
        let filter = permission.filter((r) => r.permissionName === section && r.parent === page)
        if (filter.length)
            return true;
    }
    return false;
}

export const checkSectionPermission = (page, section, permission) => {
    // console.log(permission);
    if (permission) {
        let index = permission.findIndex((r) => r.parent === page)
        if (index >= 0) {
            let filter = permission[index].children.filter((r) => r.permissionName === section)
            if (filter.length)
                return true;
        }
    }
    return false;
}

export const checkGetSidebar = (page, permission) => {
    if (permission) {
        let filter = permission.filter((r) => r.parent === page)
        if (filter.length)
            return true;
    }
    return false;
}

export const getRoles = () => {
    let roles = localStorage.getItem("mad-influence-admin-token");
    let _role = [];
    if (roles) {
        _role = JSON.parse(roles);
        _role = _role?.permissions
    }
    return _role;
}

export const getAllPermission = (allPermission, isSuperAdmin) => {
    let json = []
    allPermission.forEach((f) => {
        let index = json.findIndex((j) => j.parent === f.parent);
        let toTo = true;
        if (!isSuperAdmin && f.permissionName === "IS_ADMIN") {
            toTo = false;
        }
        if (toTo) {
            if (index >= 0) {
                json[index].children.push({ ...f })
            }
            else {
                json.push({
                    parent: f.parent,
                    children: [{ ...f }]
                })
            }
        }

    })

    return json
}