var graphQlLib = require('/lib/graphql');


exports.geoPointType = graphQlLib.createObjectType({
    name: 'GeoPoint',
    description: 'GeoPoint.',
    fields: {
        value: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source;
            }
        },
        latitude: {
            type: graphQlLib.GraphQLFloat,
            resolve: function (env) {
                return env.source.split(',',2)[0];
            }
        },
        longitude: {
            type: graphQlLib.GraphQLFloat,
            resolve: function (env) {
                return env.source.split(',',2)[1];
            }
        }
    }
});

exports.mediaFocalPointType = graphQlLib.createObjectType({
    name: 'MediaFocalPoint',
    description: 'Media focal point.',
    fields: {
        x: {
            type: graphQlLib.GraphQLFloat,
            resolve: function (env) {
                return env.source.x;
            }
        },
        y: {
            type: graphQlLib.GraphQLFloat,
            resolve: function (env) {
                return env.source.y;
            }
        }
    }
});

exports.mediaUploaderType = graphQlLib.createObjectType({
    name: 'MediaUploader',
    description: 'Media uploader.',
    fields: {
        attachment: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.attachment;
            }
        },
        focalPoint: {
            type: exports.mediaFocalPointType,
            resolve: function (env) {
                return env.source.focalPoint;
            }
        }
    }
});

exports.siteConfiguratorType = graphQlLib.createObjectType({
    name: 'SiteConfigurator',
    description: 'Site configurator.',
    fields: {
        applicationKey: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.applicationKey;
            }
        },
        config: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return JSON.stringify(env.source.config);
            }
        }
    }
});

exports.publishInfoType = graphQlLib.createObjectType({
    name: 'PublishInfo',
    description: 'Publish information.',
    fields: {
        from: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.from;
            }
        },
        to: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.to;
            }
        },
        first: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.first;
            }
        }
    }
});

exports.attachmentType = graphQlLib.createObjectType({
    name: 'Attachment',
    description: 'Attachment.',
    fields: {
        name: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.name;
            }
        },
        label: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.label;
            }
        },
        size: {
            type: graphQlLib.GraphQLInt,
            resolve: function (env) {
                return env.source.size;
            }
        },
        mimeType: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.mimeType;
            }
        }
    }
});

exports.componentType = graphQlLib.createObjectType({
    name: 'Component',
    description: 'Component.',
    fields: {
        name: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.name;
            }
        },
        path: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.path;
            }
        },
        type: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.type;
            }
        },
        descriptor: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.descriptor;
            }
        },
        text: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.text;
            }
        },
        fragment: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.fragment;
            }
        },
        config: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return JSON.stringify(env.source.config);
            }
        },
        regions: {
            type: graphQlLib.list(graphQlLib.reference('PageRegion')),
            resolve: function (env) {
                return env.source.regions && Object.keys(env.source.regions).map(function (key) {
                        return env.source.regions[key];
                    });
            }
        }
    }
});

exports.pageRegionType = graphQlLib.createObjectType({
    name: 'PageRegion',
    description: 'Page region.',
    fields: {
        name: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.name;
            }
        },
        components: {
            type: graphQlLib.list(exports.componentType),
            resolve: function (env) {
                return env.source.components; //TODO
            }
        }
    }
});

exports.pageType = graphQlLib.createObjectType({
    name: 'Page',
    description: 'Page.',
    fields: {
        template: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.template;
            }
        },
        controller: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return env.source.controller;
            }
        },
        config: {
            type: graphQlLib.GraphQLString,
            resolve: function (env) {
                return JSON.stringify(env.source.config);
            }
        },
        regions: {
            type: graphQlLib.list(exports.pageRegionType),
            resolve: function (env) {
                return env.source.regions && Object.keys(env.source.regions).map(function (key) {
                    return env.source.regions[key];
                });
            }
        },
        fragment: {
            type: exports.componentType,
            resolve: function (env) {
                return env.source.fragment;
            }
        }
    }
});