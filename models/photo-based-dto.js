class PhotoBasedDto{
    constructor(
        name,
        description,
        category,
        photo,
        code,
        count,
        type,
        audio
    ){
        this.name = name;
        this.description = description;
        this.category = category;
        this.photo = photo;
        this.code = code;
        this.count = count;
        this.type = type;
        this.audio = audio;
    }
}

module.exports = PhotoBasedDto