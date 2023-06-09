export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.01b4e224.js","app":"_app/immutable/entry/app.dfe102b4.js","imports":["_app/immutable/entry/start.01b4e224.js","_app/immutable/chunks/index.6dba6488.js","_app/immutable/chunks/singletons.96872ce4.js","_app/immutable/entry/app.dfe102b4.js","_app/immutable/chunks/index.6dba6488.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
