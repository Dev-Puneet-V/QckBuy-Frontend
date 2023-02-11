export default (func: any) => (req: any, res: any, next: any, ...params: any[]) => 
    Promise.resolve(func(req, res, next, ...params)).catch(next);