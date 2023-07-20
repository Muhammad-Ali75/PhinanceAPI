  static convertQueryToMySqlQuery({
    tabName,
    filterQuery,
    queryType,
    warehouseId,
  }) {
    let baseQuery = this.getBaseQuery(tabName, queryType);

    baseQuery = baseQuery.replace(/\n\s*/g, " ");

    if (tabName === "inventory") {
      baseQuery = baseQuery.replace(
        "stock.warehouseId=?",
        `stock.warehouseId=${warehouseId}`
      );
    }

    // Replace the operators and functions with their SQL equivalents
    let sqlString = filterQuery
      .replace(/ ne /g, "<>")
      .replace(/ eq /g, "=")
      .replace(/ lt /g, "<")
      .replace(/ le /g, "<=")
      .replace(/ gt /g, ">")
      .replace(/ ge /g, ">=")
      .replace(/startswith\(tolower\(([^)]*)\),'([^']*)'\)/g, "$1 LIKE '$2%'")
      .replace(/endswith\(tolower\(([^)]*)\),'([^']*)'\)/g, "$1 LIKE '%$2'")
      .replace(/substringof\('([^']*)',tolower\(([^)]*)\)\)/g, "$2 LIKE '%$1%'")
      .replace(/\bnot\b/gi, "NOT")
      .replace(/(\d+)([a-zA-Z]+)/g, "$1")
      .replace(/ and /g, " AND ")
      .replace(/ or /g, " OR ")
      .replace(/= null/g, "IS NULL")
      .replace(/<> null/g, "IS NOT NULL");

    return `${baseQuery} WHERE ${sqlString}`;
  }

  static getBaseQuery(tab, type) {
    if (tab === "product") {
      return getProduct;
    } else if (tab === "suppliers") {
      return getSuppliers;
    } else if (tab === "restock") {
      return getRestockFullData;
    } else if (tab === "profit") {
      return getProfit;
    } else if (tab === "inventory") {
      return localInventory;
    } else if (tab === "shipment") {
      if (!type || type == 0) {
        return getPurchaseOrder;
      } else {
        return getVirtualPurchaseOrder;
      }
    }
  }
