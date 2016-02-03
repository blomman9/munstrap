      String.prototype.hashCode = function(){
        var FNV_OFFSET_32 = 0x811c9dc5;
        var hval = FNV_OFFSET_32;
          for (var i = 0; i < this.length; i++) {
              hval = hval ^ (this.charCodeAt(i) & 0xFF);
              hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
          }
          return hval >>> 0;
      }

      //Bootstrap tab anchor fix
      var url = document.location.toString();
      if (url.match('#')) {
        var taget = url.split('#')[1];
        $('.nav-tabs a[href=#' + taget + ']').tab('show');
        $('.tab-pane.active').removeClass('active');
        $('.tab-pane.in').removeClass('in');
        $('#' + taget).addClass('active');
        $('#' + taget).addClass('in');
        $('#' + taget).addClass('fade');
      }
      $('#overview').on('click', function (e) {
        $('.tab-pane').dropdown();
      });
      $('.nav-tabs a').on('click', function (e) {
        e.preventDefault();
        window.location.hash = e.target.hash;
        refreshMunstrap.delayed(e.target.hash);
      });
      // Allocate an event listener that keeps information of latest update of each of the sections
      var refreshMunstrap = function () {
        var _timer, _cache;

        var now = function() {
          var $pane = $('.tab-pane.active');
          storeCache('#' + $pane.attr('id'));
          $('img', $pane).each(function () {
            var $elem = $(this);
            var src = $elem.data('src');
            if (typeof src == 'undefined') {
              src = $elem.attr('src');
              $elem.data('src', src);
            }
            $elem.attr('src', src + '?' + Date().hashCode());
          });
        }

        var delayed = function(hash_) {
          clearTimer();
          setTimer();
          // if it has been long enough since last check up, fetch now, otherwise just fetch now
          if (checkCache(hash_)) now();
        }

        var storeCache = function(hash_) {
          if (typeof _cache[hash_] == 'undefined') {
            _cache[hash_] = {
              "hash": hash_
            }
          }
          _cache[hash_].date = Date.now();
        }

        var checkCache = function(hash_) {
          if (typeof _cache[hash_] == 'undefined') return true;
          return _cache[hash_].date > Date.now() + 15000;
        }

        var clearTimer = function() {
          if (_timer) window.clearTimeout(_timer);
        }

        var setTimer = function() {
          _timer = window.setInterval(now, 40000);
        }

        var init = function() {
          _cache = [];
          clearTimer();
          setTimer();
        }();

        return {
          now: now,
          delayed: delayed
        }
      }();
