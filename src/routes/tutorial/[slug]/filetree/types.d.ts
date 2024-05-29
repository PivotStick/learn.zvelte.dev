export type Tree = Directory | File;

export type Directory = Record<
	string,
	{
		directory: Directory | File;
		open?: boolean;
	}
>;

export type File = Record<
	string,
	{
		file: {
			contents: string;
		};
	}
>;

export type FiletreeContext = {
	focus: string;
};
