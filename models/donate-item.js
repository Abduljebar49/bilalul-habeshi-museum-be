
class DonateItem {
    constructor(
        id,
        name,
        primaryPhoneNumber,
        secondaryPhoneNumber,
        email,
        description,
        location,
        photo,
        status,
        remark
    ){
        this.id = id;
        this.name = name;
        this.primaryPhoneNumber = primaryPhoneNumber;
        this.secondaryPhoneNumber = secondaryPhoneNumber;
        this.email = email;
        this.description = description;
        this.location = location;
        this.photo = photo;
        this.status = status;
        this.remark = remark;
    }
}

module.exports = DonateItem;