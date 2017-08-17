var authLib = require('/lib/xp/auth');
var portalLib = require('/lib/xp/portal');

exports.isSiteContext = function () {
    return !!portalLib.getSite();
};
exports.isAllowedSiteContext = function () {
    return !!portalLib.getSiteConfig();
};
exports.isAdmin = function () {
    log.info('isAdmin:' + authLib.hasRole('system.admin'));
    return authLib.hasRole('system.admin');
};
exports.isCmsAdmin = function () {
    log.info('isCmsAdmin:' + authLib.hasRole('cms.admin'));
    return authLib.hasRole('cms.admin');
};

exports.filterForbiddenContent = function (content) {
    var sitePath = portalLib.getSite()._path;
    return content._path === sitePath || content._path.indexOf(sitePath + '/') === 0 ? content : null;
};

exports.adaptQuery = function (query) {
    var sitePath = portalLib.getSite()._path;
    return '(_path = "/content' + sitePath + '" OR _path LIKE "/content' + sitePath + '/*") AND (' + query + ')';
};