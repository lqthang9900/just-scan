"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("./image-cache-it.common");
var fs = require("file-system");
var utils = require("utils/utils");
var imageSrc = require("image-source");
global.moduleMerge(common, exports);
var ImageCacheIt = (function (_super) {
    __extends(ImageCacheIt, _super);
    function ImageCacheIt() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ImageCacheIt.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    ImageCacheIt.prototype.createNativeView = function () {
        this.picasso = com.squareup.picasso.Picasso.with(this._context);
        return new android.widget.ImageView(this._context);
    };
    ImageCacheIt.prototype.initNativeView = function () {
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        if (this.placeHolder) {
            this.builder.placeholder(imageSrc.fromFileOrResource(this.placeHolder).android);
        }
        if (this.errorHolder) {
            this.builder.error(imageSrc.fromFileOrResource(this.errorHolder).android);
        }
        if (this.resize && this.resize !== undefined && this.resize.split(' ').length > 1) {
            this.builder.resize(parseInt(this.resize.split(' ')[0]), parseInt(this.resize.split(' ')[1]));
        }
        else if (this.override && this.override !== undefined && this.override.split(' ').length > 1) {
            this.builder.resize(parseInt(this.override.split(' ')[0]), parseInt(this.override.split(' ')[1]));
        }
        if (this.centerCrop) {
            this.builder.centerCrop();
        }
        this.builder.into(this.nativeView);
    };
    ImageCacheIt.prototype[common.imageUriProperty.getDefault] = function () {
        return undefined;
    };
    ImageCacheIt.prototype[common.imageUriProperty.setNative] = function (src) {
        if (!this.builder) {
            return;
        }
        this.builder = this.picasso.load(this.getImage(this.imageUri));
        this.builder.into(this.nativeView);
    };
    ImageCacheIt.prototype[common.resizeProperty.setNative] = function (resize) {
        if (!this.builder) {
            return;
        }
        if (resize && resize !== undefined && resize.split(' ').length > 1) {
            this.builder.resize(parseInt(resize.split(' ')[0]), parseInt(resize.split(' ')[1]));
        }
    };
    ImageCacheIt.prototype[common.overrideProperty.setNative] = function (override) {
        if (!this.builder) {
            return;
        }
        if (override && override !== undefined && override.split(' ').length > 1) {
            this.builder.resize(parseInt(override.split(' ')[0]), parseInt(override.split(' ')[1]));
        }
    };
    ImageCacheIt.prototype.getImage = function (src) {
        var nativeImage;
        if (!src) {
            return;
        }
        if (src.substr(0, 1) === '/') {
            nativeImage = new java.io.File(nativeImage);
        }
        else if (src.startsWith("~/")) {
            nativeImage = new java.io.File(fs.path.join(fs.knownFolders.currentApp().path, src.replace("~/", "")));
        }
        else if (src.startsWith("https://") || src.startsWith("http://")) {
            nativeImage = src;
        }
        else if (src.startsWith('res://')) {
            nativeImage = utils.ad.resources.getDrawableId(src.replace('res://', ''));
        }
        return nativeImage;
    };
    ImageCacheIt.prototype[common.stretchProperty.getDefault] = function () {
        return "aspectFit";
    };
    ImageCacheIt.prototype[common.stretchProperty.setNative] = function (value) {
        switch (value) {
            case 'aspectFit':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
                break;
            case 'aspectFill':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
                break;
            case 'fill':
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
                break;
            case 'none':
            default:
                this.nativeView.setScaleType(android.widget.ImageView.ScaleType.MATRIX);
                break;
        }
    };
    ImageCacheIt.prototype.clearItem = function () {
        // this.builder.
    };
    return ImageCacheIt;
}(common.ImageCacheIt));
exports.ImageCacheIt = ImageCacheIt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtY2FjaGUtaXQuYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlLWNhY2hlLWl0LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBa0Q7QUFFbEQsZ0NBQW1DO0FBQ25DLG1DQUFzQztBQUV0Qyx1Q0FBMEM7QUFFMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEM7SUFBa0MsZ0NBQW1CO0lBR2pEO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBRUQsc0JBQUksaUNBQU87YUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ00sdUNBQWdCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNNLHFDQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUks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LENBQUMsQ0FBQztnQkFDN0UsS0FBSyxDQUFDO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEUsS0FBSyxDQUFDO1lBQ1YsS0FBSyxNQUFNLENBQUM7WUFDWjtnQkFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hFLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRU0sZ0NBQVMsR0FBaEI7UUFDSSxnQkFBZ0I7SUFDcEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQW5HRCxDQUFrQyxNQUFNLENBQUMsWUFBWSxHQW1HcEQ7QUFuR1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb21tb24gZnJvbSAnLi9pbWFnZS1jYWNoZS1pdC5jb21tb24nO1xuaW1wb3J0IGFwcCA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcbmltcG9ydCBmcyA9IHJlcXVpcmUoXCJmaWxlLXN5c3RlbVwiKTtcbmltcG9ydCB1dGlscyA9IHJlcXVpcmUoXCJ1dGlscy91dGlsc1wiKTtcbmltcG9ydCB0eXBlcyA9IHJlcXVpcmUoXCJ1dGlscy90eXBlc1wiKTtcbmltcG9ydCBpbWFnZVNyYyA9IHJlcXVpcmUoXCJpbWFnZS1zb3VyY2VcIik7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXcnO1xuZ2xvYmFsLm1vZHVsZU1lcmdlKGNvbW1vbiwgZXhwb3J0cyk7XG5cbmV4cG9ydCBjbGFzcyBJbWFnZUNhY2hlSXQgZXh0ZW5kcyBjb21tb24uSW1hZ2VDYWNoZUl0IHtcbiAgICBwaWNhc3NvOiBjb20uc3F1YXJldXAucGljYXNzby5QaWNhc3NvO1xuICAgIHByaXZhdGUgYnVpbGRlcjogY29tLnNxdWFyZXVwLnBpY2Fzc28uUmVxdWVzdENyZWF0b3I7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0IGFuZHJvaWQoKTogYW5kcm9pZC53aWRnZXQuSW1hZ2VWaWV3IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlVmlldztcbiAgICB9XG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHRoaXMucGljYXNzbyA9IGNvbS5zcXVhcmV1cC5waWNhc3NvLlBpY2Fzc28ud2l0aCh0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIG5ldyBhbmRyb2lkLndpZGdldC5JbWFnZVZpZXcodGhpcy5fY29udGV4dCk7XG4gICAgfVxuICAgIHB1YmxpYyBpbml0TmF0aXZlVmlldygpIHtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gdGhpcy5waWNhc3NvLmxvYWQodGhpcy5nZXRJbWFnZSh0aGlzLmltYWdlVXJpKSk7XG5cbiAgICAgICAgaWYgKHRoaXMucGxhY2VIb2xkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlci5wbGFjZWhvbGRlcihpbWFnZVNyYy5mcm9tRmlsZU9yUmVzb3VyY2UodGhpcy5wbGFjZUhvbGRlcikuYW5kcm9pZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JIb2xkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlci5lcnJvcihpbWFnZVNyYy5mcm9tRmlsZU9yUmVzb3VyY2UodGhpcy5lcnJvckhvbGRlcikuYW5kcm9pZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVzaXplICYmIHRoaXMucmVzaXplICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZXNpemUuc3BsaXQoJyAnKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIucmVzaXplKHBhcnNlSW50KHRoaXMucmVzaXplLnNwbGl0KCcgJylbMF0pLCBwYXJzZUludCh0aGlzLnJlc2l6ZS5zcGxpdCgnICcpWzFdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlICYmIHRoaXMub3ZlcnJpZGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm92ZXJyaWRlLnNwbGl0KCcgJykubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyLnJlc2l6ZShwYXJzZUludCh0aGlzLm92ZXJyaWRlLnNwbGl0KCcgJylbMF0pLCBwYXJzZUludCh0aGlzLm92ZXJyaWRlLnNwbGl0KCcgJylbMV0pKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNlbnRlckNyb3ApIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRlci5jZW50ZXJDcm9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZGVyLmludG8odGhpcy5uYXRpdmVWaWV3KTtcbiAgICB9XG4gICAgW2NvbW1vbi5pbWFnZVVyaVByb3BlcnR5LmdldERlZmF1bHRdKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIFtjb21tb24uaW1hZ2VVcmlQcm9wZXJ0eS5zZXROYXRpdmVdKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5idWlsZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZGVyID0gdGhpcy5waWNhc3NvLmxvYWQodGhpcy5nZXRJbWFnZSh0aGlzLmltYWdlVXJpKSk7XG4gICAgICAgIHRoaXMuYnVpbGRlci5pbnRvKHRoaXMubmF0aXZlVmlldyk7XG4gICAgfVxuICAgIFtjb21tb24ucmVzaXplUHJvcGVydHkuc2V0TmF0aXZlXShyZXNpemU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuYnVpbGRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNpemUgJiYgcmVzaXplICE9PSB1bmRlZmluZWQgJiYgcmVzaXplLnNwbGl0KCcgJykubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyLnJlc2l6ZShwYXJzZUludChyZXNpemUuc3BsaXQoJyAnKVswXSksIHBhcnNlSW50KHJlc2l6ZS5zcGxpdCgnICcpWzFdKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBbY29tbW9uLm92ZXJyaWRlUHJvcGVydHkuc2V0TmF0aXZlXShvdmVycmlkZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5idWlsZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJyaWRlICYmIG92ZXJyaWRlICE9PSB1bmRlZmluZWQgJiYgb3ZlcnJpZGUuc3BsaXQoJyAnKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkZXIucmVzaXplKHBhcnNlSW50KG92ZXJyaWRlLnNwbGl0KCcgJylbMF0pLCBwYXJzZUludChvdmVycmlkZS5zcGxpdCgnICcpWzFdKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGdldEltYWdlKHNyYzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG5hdGl2ZUltYWdlO1xuICAgICAgICAgaWYoIXNyYyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyYy5zdWJzdHIoMCwgMSkgPT09ICcvJykge1xuICAgICAgICAgICAgbmF0aXZlSW1hZ2UgPSBuZXcgamF2YS5pby5GaWxlKG5hdGl2ZUltYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcmMuc3RhcnRzV2l0aChcIn4vXCIpKSB7XG4gICAgICAgICAgICBuYXRpdmVJbWFnZSA9IG5ldyBqYXZhLmlvLkZpbGUoZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aCwgc3JjLnJlcGxhY2UoXCJ+L1wiLCBcIlwiKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKHNyYy5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikgfHwgc3JjLnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpKSB7XG4gICAgICAgICAgICBuYXRpdmVJbWFnZSA9IHNyYztcbiAgICAgICAgfSBlbHNlIGlmIChzcmMuc3RhcnRzV2l0aCgncmVzOi8vJykpIHtcbiAgICAgICAgICAgIG5hdGl2ZUltYWdlID0gdXRpbHMuYWQucmVzb3VyY2VzLmdldERyYXdhYmxlSWQoc3JjLnJlcGxhY2UoJ3JlczovLycsICcnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZUltYWdlO1xuICAgIH1cbiAgICBbY29tbW9uLnN0cmV0Y2hQcm9wZXJ0eS5nZXREZWZhdWx0XSgpOiBcImFzcGVjdEZpdFwiIHtcbiAgICAgICAgcmV0dXJuIFwiYXNwZWN0Rml0XCI7XG4gICAgfVxuICAgIFtjb21tb24uc3RyZXRjaFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IFwibm9uZVwiIHwgXCJhc3BlY3RGaWxsXCIgfCBcImFzcGVjdEZpdFwiIHwgXCJmaWxsXCIpIHtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnYXNwZWN0Rml0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZVZpZXcuc2V0U2NhbGVUeXBlKGFuZHJvaWQud2lkZ2V0LkltYWdlVmlldy5TY2FsZVR5cGUuRklUX0NFTlRFUik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhc3BlY3RGaWxsJzpcbiAgICAgICAgICAgICAgICB0aGlzLm5hdGl2ZVZpZXcuc2V0U2NhbGVUeXBlKGFuZHJvaWQud2lkZ2V0LkltYWdlVmlldy5TY2FsZVR5cGUuQ0VOVEVSX0NST1ApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVWaWV3LnNldFNjYWxlVHlwZShhbmRyb2lkLndpZGdldC5JbWFnZVZpZXcuU2NhbGVUeXBlLkZJVF9YWSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5uYXRpdmVWaWV3LnNldFNjYWxlVHlwZShhbmRyb2lkLndpZGdldC5JbWFnZVZpZXcuU2NhbGVUeXBlLk1BVFJJWCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJJdGVtKCkge1xuICAgICAgICAvLyB0aGlzLmJ1aWxkZXIuXG4gICAgfVxufSJdfQ==