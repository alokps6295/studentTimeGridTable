export const success = (res, entity) => {
    if (entity) {
        return res.status(200).send(entity);
    }
}

export const failure = (res, err) => {
    if (err) {
        return res.status(500).send(err);
    }
}

export const notFound = (res, msg) => {
    if (msg) {
        return res.status(404).send(msg);
    }
}