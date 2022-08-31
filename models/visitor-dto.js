
class VisitorDto {
    constructor(
        name,
        phoneNumber,
        noOfVisitor,
        visitDate,
        visitTime,
        status,
        remark
    ){
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.noOfVisitor = noOfVisitor;
        this.visitDate = visitDate;
        this.visitTime = visitTime;
        this.status = status;
        this.remark = remark;
    }
}

module.exports = VisitorDto;