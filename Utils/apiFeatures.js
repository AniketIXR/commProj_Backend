class ApiFeature{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    } 

    filter=()=>{

        let queryObj = {...this.queryString};
        const excludeFields = ["page","sort","fields","limit"];
        excludeFields.forEach(field => delete queryObj[field]);

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    sort=()=>{
        if(this.queryString.sort)
        {
            const sortcon = this.queryString.sort.split(",").join(" ");
            this.query.sort(sortcon);
        }
        else
        {
            this.query.sort("-creationTime");
        }
        return this;
    }

    pagination=()=>{
        const page=this.queryString.page *1 || 1;
        const limit = this.queryString.limit *1 || 100;
        const offset = (page-1)*limit;
        this.query.skip(offset).limit(limit);
        return this;
    }
}

module.exports = ApiFeature;