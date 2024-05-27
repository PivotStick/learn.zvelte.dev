import { error } from "@sveltejs/kit";

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

    // const cwd = "content/tutorial";
    // const exercises = [""]

    let readme = null;

    // if (!readme) throw error(404, "Exercise not found")

    return {
        readme
    }
}
