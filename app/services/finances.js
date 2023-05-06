module.exports = {
    getPalletProfit: function (items) {
        let itemProfits = 0
        for (let item of items) {
            if (item.sold == 1) {
                itemProfits = itemProfits + this.getItemProfit(item)
            }
        }
        return itemProfits
    },

    getItemProfit: function (item) {
        let itemProfits = 0
        if (item.sellPrice != null) {
            itemProfits = itemProfits + Number(item.sellPrice)
        }
        if (item.shippingCost != null) {
            itemProfits = itemProfits - Number(item.shippingCost)
        }
        if (item.miscExpenses != null) {
            itemProfits = itemProfits - Number(item.miscExpenses)
        }
        return Math.round(itemProfits * 100) / 100
    }
}

