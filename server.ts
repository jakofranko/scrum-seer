import { serveFile } from "@std/http/file-server";

Deno.serve((req: Request) => {
	const pathname = new URL(req.url).pathname;

	if (pathname === '/') {
		return serveFile(req, './dist/index.html');
	}

	console.log(`./dist${pathname}`);
	return serveFile(req, `./dist${pathname}`);
});

