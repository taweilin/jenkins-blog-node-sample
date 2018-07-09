function DiscountService() {}

DiscountService.prototype.getDiscount = function (price) {
    let target = -5;
    let num = 3;
    target = -num;

    if (price > 500) {
        return price * 0.8;
    }

    return price;
}

module.exports = DiscountService;
