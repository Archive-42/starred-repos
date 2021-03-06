import { IDashboardTemplate } from "../DashboardTemplateService";
import { EFamilyTypes } from "../components/DashboardTemplatesConfig";
import { AssetsService } from "../../../../services/AssetsService";

const dashboard: IDashboardTemplate = {
    id: 5,
    title: "dashboard.templates.brandprotection.title",
    description: "dashboard.templates.brandprotection.description",
    descriptionLong: "dashboard.templates.brandprotection.description.long",
    keyMetrics: "dashboard.templates.brandprotection.keymetric",
    previewImage: AssetsService.assetUrl("/images/dashboard/templates/BrandProtection-preview.png"),
    thumbnailImage: AssetsService.assetUrl("/images/dashboard/templates/BrandProtection-thumb.png"),
    familyType: EFamilyTypes.Keyword,
    minItems: 1,
    maxItems: 1,
    widgets: [
        {
            pos: {
                sizeX: 1,
                sizeY: 1,
                maxSizeY: 1,
                minSizeX: 1,
                maxSizeX: 2,
                row: 0,
                col: 0,
            },
            properties: {
                selectedChannel: "Direct",
                metric: "KeywordAnalysisCPC",
                webSource: "Desktop",
                duration: "3m",
                type: "SingleMetric",
                filters: {},
                width: "2",
                customAsset: "Website",
                family: "Keyword",
                options: {},
                tooltip: "",
                title: "CPC",
            },
        },
        {
            pos: {
                sizeX: 1,
                sizeY: 1,
                maxSizeY: 1,
                minSizeX: 1,
                maxSizeX: 2,
                row: 0,
                col: 1,
            },
            properties: {
                selectedChannel: "Direct",
                metric: "KeywordAnalysisVolumes",
                webSource: "Desktop",
                duration: "1m",
                type: "SingleMetric",
                filters: {},
                width: "1",
                customAsset: "Keyword",
                family: "Keyword",
                options: {},
                title: "Search Volume",
                tooltip: "Search Volume.tooltip",
            },
        },
        {
            pos: {
                sizeX: 2,
                sizeY: 1,
                maxSizeY: 1,
                minSizeX: 1,
                maxSizeX: 2,
                row: 0,
                col: 2,
            },
            properties: {
                flexibleDuration: true,
                selectedChannel: "Direct",
                metric: "KeywordAnalysisTrafficShare",
                webSource: "Desktop",
                duration: "6m",
                type: "PieChart",
                filters: {},
                width: "1",
                customAsset: "Keyword",
                family: "Keyword",
                options: {},
                tooltip: "",
                title: "Organic vs Paid",
            },
        },
        {
            pos: {
                sizeX: 4,
                sizeY: 2,
                maxSizeY: 2,
                minSizeX: 2,
                maxSizeX: 4,
                row: 1,
                col: 0,
            },
            properties: {
                flexibleDuration: true,
                selectedChannel: "Direct",
                metric: "KeywordAnalysisPaid",
                webSource: "Desktop",
                duration: "6m",
                type: "KeywordsGraphDashboard",
                filters: {
                    shareType: "RelativeShare",
                },
                width: "2",
                customAsset: "Keyword",
                family: "Keyword",
                options: {},
                title: "Traffic Share Paid",
                tooltip: "Traffic Share Paid.tooltip",
            },
        },
        {
            pos: {
                sizeX: 2,
                sizeY: 2,
                maxSizeY: 2,
                minSizeX: 2,
                maxSizeX: 4,
                row: 3,
                col: 0,
            },
            properties: {
                selectedChannel: "Direct",
                metric: "KeywordAnalysisPaid",
                webSource: "Desktop",
                duration: "1m",
                type: "KeywordsDashboardTable",
                filters: {
                    orderBy: "TotalShare desc",
                },
                width: "2",
                customAsset: false,
                family: "Keyword",
                options: {},
                title: "PPC | Last Month",
                tooltip: "PPC Last 28 Days.tooltip",
                titleTemplate: "custom",
            },
        },
        {
            pos: {
                sizeX: 2,
                sizeY: 2,
                maxSizeY: 2,
                minSizeX: 2,
                maxSizeX: 4,
                row: 3,
                col: 2,
            },
            properties: {
                selectedChannel: "Direct",
                metric: "KeywordAnalysisPaid",
                webSource: "Desktop",
                duration: "3m",
                type: "KeywordsDashboardTable",
                filters: {
                    orderBy: "TotalShare desc",
                    timeGranularity: "Monthly",
                },
                width: "2",
                customAsset: "Industry",
                family: "Keyword",
                options: {},
                title: "PPC | Last 3 Month",
                tooltip: "PPC Previous Month.tooltip",
                titleTemplate: "custom",
            },
        },
        {
            pos: {
                sizeX: 4,
                sizeY: 1,
                maxSizeY: 2,
                minSizeX: 2,
                maxSizeX: 4,
                row: 5,
                col: 0,
            },
            properties: {
                flexibleDuration: true,
                selectedChannel: "Direct",
                metric: "KeywordAnalysisOrganic",
                webSource: "Desktop",
                duration: "6m",
                type: "KeywordsGraphDashboard",
                filters: {
                    shareType: "RelativeShare",
                },
                width: "2",
                customAsset: false,
                family: "Keyword",
                options: {},
                tooltip: "",
                title: "Organic Traffic Share",
            },
        },
        {
            pos: {
                sizeX: 2,
                sizeY: 2,
                maxSizeY: 2,
                minSizeX: 2,
                maxSizeX: 4,
                row: 6,
                col: 0,
            },
            properties: {
                metric: "KeywordAnalysisOrganic",
                webSource: "Desktop",
                duration: "1m",
                type: "KeywordsDashboardTable",
                filters: {
                    orderBy: "TotalShare desc",
                },
                width: "2",
                customAsset: false,
                family: "Keyword",
                options: {},
                title: "Organic Traffic Share | Last Month",
                titleTemplate: "custom",
            },
        },
        {
            pos: {
                sizeX: 2,
                sizeY: 2,
                maxSizeY: 2,
                minSizeX: 2,
                maxSizeX: 4,
                row: 6,
                col: 2,
            },
            properties: {
                metric: "KeywordAnalysisOrganic",
                webSource: "Desktop",
                duration: "3m",
                type: "KeywordsDashboardTable",
                filters: {
                    orderBy: "TotalShare desc",
                    timeGranularity: "Monthly",
                },
                width: "2",
                customAsset: "Industry",
                family: "Keyword",
                options: {},
                title: "Organic Traffic Share | Last 3 Month",
                titleTemplate: "custom",
            },
        },
    ],
};

export default dashboard;
