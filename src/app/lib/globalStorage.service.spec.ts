import { TestBed, async } from '@angular/core/testing';

import { GlobalStorage } from './globalStorage.service';

describe("GlobalStorage", () => {
    afterEach(() => {
        let storage = new GlobalStorage();
        storage.reset();
    });

    it("Should be able to store and retrieve a key", () => {
        let storage = new GlobalStorage();
        let glob = storage.getNewGlob();
        expect(typeof glob).toBe("number");

        storage.store(glob, "test", "foo");
        expect(storage.fetch(glob, "test")).toBe("foo");

        // Let's do a reset test as well
        storage.reset();
        expect(storage.fetch(glob, "test")).toBe(undefined);
    });

    it("Should be able to store and retrieve the same key through different GlobalStorage instances", () => {
        let storage1 = new GlobalStorage();
        let storage2 = new GlobalStorage();

        let glob = storage1.getNewGlob();
        expect(typeof glob).toBe("number");

        storage1.store(glob, "foo", "bar");
        expect(storage2.fetch(glob, "foo")).toBe("bar");

        storage2.store(glob, "foo", "foobar");
        expect(storage1.fetch(glob, "foo")).toBe("foobar");
    });

    it("Should be able to refer to the same object over different GlobalStorage instances", () => {
        let storage1 = new GlobalStorage();
        let storage2 = new GlobalStorage();
        let object1 = {dog: "cat"};
        let object2 = {foo: "bar"};

        let glob = storage1.getNewGlob();
        expect(typeof glob).toBe("number");

        storage1.store(glob, "bar", object1);
        expect(storage2.fetch(glob, "bar")).toBe(object1);

        storage2.store(glob, "bar", object2);
        expect(storage1.fetch(glob, "bar")).toBe(object2);
    });
});