class HandleFunctionFactory {
    constructor(model) {
        this.model = model;

        this.get = this.get.bind(this);
        this.getList = this.getList.bind(this);
        this.edit = this.edit.bind(this);
        this.create = this.create.bind(this);
        this.destroy = this.destroy.bind(this);
        this.checkValidationRequestBody = this.checkValidationRequestBody.bind(this);
    }

    checkValidationRequestBody(requestBody, next) {}

    async get(req, res, next) {
        const { id } = req.params;
        const { fields } = req.query;
        try {
            const findParams = {
                where: {
                    id,
                },
            };

            if (fields) {
                findParams["attributes"] = fields.split(";");
            }

            const record = await this.model.findOne(findParams);

            if (record) {
                res.send(record);
            } else {
                res.send("Dont find record with id!");
            }
        } catch (error) {
            next(error);
        }
    }

    async getList(req, res, next) {
        const { search, limit = 80, page = 1, fields } = req.query;
        try {
            const findParams = {
                offset: (page - 1) * limit,
                limit,
                raw: true,
            };

            if (search) {
                findParams["where"] = { name: search };
            }

            if (fields) {
                findParams["attributes"] = fields.split(";");
            }

            const result = await this.model.findAndCountAll(findParams);
            if (result) {
                res.send(result);
            } else {
                res.send("List empty!");
            }
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const record = await this.model.create({ ...req.body, createdAt: Date.now(), updatedAt: Date.now() });
            if (record) {
                res.send(record);
            } else {
                res.send("Cant create!");
            }
        } catch (error) {
            next(error);
        }
    }

    async createList(req, res, next) {}

    async edit(req, res, next) {
        try {
            const { id } = req.params;
            const record = await this.model.findByPk(id);
            if (record) {
                await record.set({ ...req.body });
                record.save();
                res.send(record);
            } else {
                res.send("Cant update record with id!");
            }
        } catch (error) {
            next(error);
        }
    }

    async editList(req, res, next) {}

    async destroy(req, res, next) {
        const { id } = req.params;
        try {
            const record = await this.model.findByPk(id);

            if (record) {
                await record.destroy();
                res.send("Deleted!");
            } else {
                res.send("Dont delete record with id!");
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteList(req, res, next) {}
}

module.exports = HandleFunctionFactory;
