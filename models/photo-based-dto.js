class PhotoBasedDto{
    constructor(
        name,
        description,
        category,
        photo,
        code
    ){
        this.name = name;
        this.description = description;
        this.category = category;
        this.photo = photo;
        this.code = code;
    }
}

module.exports = PhotoBasedDto