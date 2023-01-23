import { belongsTo, createServer, Factory, hasMany, Model } from "miragejs"
import { AnyFactories, AnyModels, AnyResponse, Registry } from "miragejs/-types"
import { RouteHandler } from "miragejs/server"

export default createServer({
    models: {
        best: Model,
        product: Model,
    },

    factories: {
        best: Factory.extend({
            name: 'Iphone 14', 
            sales: 30,
            price: 8000,
            stock: 3,
            code (i) {
                return `MLB12345${i}`
            },
            description: 'Esse produto é muito bom'
        }),
        product: Factory.extend({
            name: 'Liquidificador portátil', 
            sales: 30,
            price: 8000,
            stock: 3,
            code (i) {
                return `MLB12345${i}`
            },
            description: 'Produto de qualidade'
        }),
    },

    seeds(server) {
        server.createList("best", 32);
        server.createList("product", 12);
    },
    routes() {

        this.namespace = 'api';

        this.get("/best-sellers", () => (
            this.schema.all('best')
        ))

        this.get("/all", () => (
            this.schema.all('product')
        ))

        this.get("/all/:search", (schema: any, request: any) => {
            const search = request.params.search
           return schema.products.where({ description: search });
        })

        this.post("/new-product", (schema: any, request: any): RouteHandler<Registry<AnyModels, AnyFactories>, AnyResponse> => {
            let data = JSON.parse(request.requestBody)
            return schema.products.create(data)
        })
    },
})
