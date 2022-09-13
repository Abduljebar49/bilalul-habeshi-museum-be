class PhotoBasedDto{
    constructor(
        name,
        description,
        category,
        photo,
        code,
        count,
        type
    ){
        this.name = name;
        this.description = description;
        this.category = category;
        this.photo = photo;
        this.code = code;
        this.count = count;
        this.type = type;
    }
}

module.exports = PhotoBasedDto