
class VisitorDto {
    constructor(
        name,
        phoneNumber,
        noOfVisitor,
        visitDate,
        visitTime,
        photo,
        status,
        remark
    ){
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.noOfVisitor = noOfVisitor;
        this.visitDate = visitDate;
        this.visitTime = visitTime;
        this.photo = photo;
        this.status = status;
        this.remark = remark;
    }
}

module.exports = VisitorDto;