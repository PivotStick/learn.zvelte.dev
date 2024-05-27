import { error } from "@sveltejs/kit";
import { readFile, readdir } from "fs/promises"
import glob from "tiny-glob";

/**
 * @param {string} dir 
 */
function isValid(dir) {
    return /^\d{2}-/.test(dir);
}

/**
 * @type {import("./$types").PageServerLoad}
 */
export async function load({ params }) {
    // const base = "content/tutorial";
    // const parts = (await readdir(base)).filter(isValid);
    //
    // const partStubs = [];
    //
    // for (const part of parts) {
    //     const chapters = (await readdir(`${base}/${part}`)).filter(isValid);
    //
    //     const partStub = {
    //
    //     }
    // }

    const cwd = "content/tutorial";
    const exercises = await glob("[0-9][0-9]-*/[0-9][0-9]-*/[0-9][0-9]-*/README.md", {
        cwd
    })

    let readme = null;

    for (let i = 0; i < exercises.length; i++) {
        const file = exercises[i];
        const [partDir, chapterDir, exerciseDir] = file.split("/")
        const exerciseSlug = exerciseDir.slice(3);

        if (exerciseSlug === params.slug) {
            readme = await readFile(`${cwd}/${file}`, "utf8");
            break;
        }
    }

    if (!readme) throw error(404, "Exercise not found")

    return {
        readme
    }
}
