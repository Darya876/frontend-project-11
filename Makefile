install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test --experimental-vn-modules --no-warnings

test-watch:
	npm test -- --watch

develop:
	npx webpack serve

build:
	rm -rf dist
	NODE_ENV=production npx webpack