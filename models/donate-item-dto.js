
class DonateItemDto {
    constructor(
        name,
        primaryPhoneNumber,
        secondaryPhoneNumber,
        email,
        description,
        location,
        status,
        remark
    ){
        this.name = name;
        this.primaryPhoneNumber = primaryPhoneNumber;
        this.secondaryPhoneNumber = secondaryPhoneNumber;
        this.email = email;
        this.description = description;
        this.location = location;
        this.status = status;
        this.remark = remark;
    }
}

module.exports = DonateItemDto;