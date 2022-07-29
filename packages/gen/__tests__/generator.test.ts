import { OpenAPIObject } from "openapi3-ts";
import generator from "../src/generator";
import { describe } from 'vitest'

const spec: OpenAPIObject = {
  openapi: "3.0.1",
  info: {
    title: "test-api",
    description: "Description for test-api",
    version: "1.0.0",
  },
  tags: [
    {
      name: "customer",
    },
  ],
  paths: {
    "/mss/product/info/list": {
      post: {
        summary: "获得商品信息列表",
        "x-apifox-folder": "merchant/基础服务 - 商品信息",
        "x-apifox-status": "developing",
        deprecated: false,
        description: "",
        operationId: "getInfoListUsingPOST",
        tags: ["customer"],
        parameters: [
          {
            name: "tenant-id",
            in: "header",
            description: "租户编号",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "Authorization",
            in: "header",
            description: "",
            example: "Bearer test1",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GuanLiHouTaiShangPinXinXiExcelDaoChuRequestVo",
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResultListGuanLiHouTaiShangPinXinXiResponseVo",
                },
                examples: {},
              },
            },
          },
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
        },
      },
      get: {
        summary: "获得商品信息列表",
        "x-apifox-folder": "merchant/基础服务 - 商品信息",
        "x-apifox-status": "released",
        deprecated: false,
        description: "",
        operationId: "getInfoListUsingGET_1",
        tags: ["merchant/基础服务 - 商品信息"],
        parameters: [
          {
            name: "bannerImgs",
            in: "query",
            description: "商品主图（视频）混合",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "beginCreateTime",
            in: "query",
            description: "开始创建时间",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "beginShelvesTime",
            in: "query",
            description: "开始上下架时间",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "brandId",
            in: "query",
            description: "品牌id",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "categoryId",
            in: "query",
            description: "品类id",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "checkStatus",
            in: "query",
            description:
              "审核状态（待审核:wait,审核通过:pass,审核驳回:reject）",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "coverImg",
            in: "query",
            description: "封面图(单独上传)",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "detailsDesc",
            in: "query",
            description: "详情描述",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "endCreateTime",
            in: "query",
            description: "结束创建时间",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "endShelvesTime",
            in: "query",
            description: "结束上下架时间",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "marketPrice",
            in: "query",
            description: "市场价(划线价)",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "merchantId",
            in: "query",
            description: "商户ID",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "payWay",
            in: "query",
            description:
              "支付方式(仅积分:integral,仅现金:money,integral_and_money,integral_or_money)",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "price",
            in: "query",
            description: "零售价(展示售价)",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "productCode",
            in: "query",
            description: "商品编码",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "productLabel",
            in: "query",
            description: "商品标签",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "productName",
            in: "query",
            description: "商品名称",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "productType",
            in: "query",
            description: "商品类型（实物:material，虚拟充值：virtual）",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "shelvesStatus",
            in: "query",
            description: "是否上架（上架shelves_up,下架shelves_down）",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "status",
            in: "query",
            description: "状态（启用:enable，禁用:disable）",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "stockSales",
            in: "query",
            description: "总销量",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "stockShelves",
            in: "query",
            description: "库存上架数",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "stockTotal",
            in: "query",
            description: "总库存",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "stockVirtualSales",
            in: "query",
            description: "虚拟销量",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "tenantId",
            in: "query",
            description: "租户ID",
            required: false,
            example: "",
            schema: {
              type: "integer",
            },
          },
          {
            name: "tenantPath",
            in: "query",
            description: "租户父节点路径(默认0)",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "tenant-id",
            in: "header",
            description: "租户编号",
            required: false,
            example: "",
            schema: {
              type: "string",
            },
          },
          {
            name: "Authorization",
            in: "header",
            description: "",
            example: "Bearer test1",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResultListGuanLiHouTaiShangPinXinXiResponseVo",
                },
                examples: {},
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
          403: {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                  "x-apifox-orders": [],
                  "x-apifox-ignore-properties": [],
                },
                examples: {},
              },
            },
          },
        },
      },
    },
  },
};

describe("", () => {});
