import { LogData, LogDataArray } from "@/types/logDisplayOptions";
import { prisma } from "./PrismaClient";
import { convertSearchParamToPrismaConditions } from "./helpers/formatSearchParamToPrismaQuery";

export const LogsData = {
    getLogs: async (searchParams?: URLSearchParams): Promise<LogDataArray> => {
        const { timeframe, sort, searchCondition } =
            convertSearchParamToPrismaConditions(searchParams);
        return await prisma.llmLogs.findMany({
            where: {
                datetime_utc: timeframe,
                OR: searchCondition,
            },
            orderBy: sort,
            include: {
                tags: {
                    orderBy: {
                        name: "asc",
                    },
                    take: 5,
                },
            },
        });
    },
    getLogDetails: async (id: string): Promise<LogData> => {
        const log = await prisma.llmLogs.findUnique({
            where: {
                id,
            },
            include: {
                tags: true,
            },
        });

        if (log === null) {
            throw new Error("Log not found");
        }

        return log;
    },
};
