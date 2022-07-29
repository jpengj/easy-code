import { Statement } from "typescript";

const createTsType = (schema?: SchemaObject | ReferenceObject) => {
  if (!schema) {
    return {
      type: 'any'
    }
  }
}

const createApiTypes = (conf: NormalizedOperation) => {
  if (!conf.parameters) {
    return;
  }
  const params = [];
  const headers = [];
  const query = [];
  for (const param of conf.parameters as ParameterObject[]) {
    if (param.in === 'header') {
      headers.push({
        name: param.name,
        required: param.required ?? false,
        type: createTsType(param.schema),
        description: param.description,
      })
    }
  }
};

const createApiResType = (api: NormalizedOperation) => {
  throw new Error("Method not implemented.");
};

const createApiUrl = (api: NormalizedOperation) => {
  throw new Error("Method not implemented.");
};

const createApiFn = () => {
  throw new Error("Method not implemented.");
};

const generateApi = (
  apis: NormalizedOperation[],
) => {
  const statements = apis.map<Statement>((api) => {
    const { params, headers, query } = createApiTypes(api);
    const resType = createApiResType(api);
    const url = createApiUrl(api);
    const tpl = `
      export const {{name}} = ([query: {{query}}], [params: {{params}}], [headers: {{headers}}]) => {
        return Request.instance.get<{{resType}}>({{url}}, { query, params, headers: {{headers}} });
      }
    `;
    return createApiFn();
  });
};


export { NormalizedOperation };
export { generateApi };
