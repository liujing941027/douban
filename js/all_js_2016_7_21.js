(function(){
	var $userInput,
	    inp = $('.search_text').eq(0),
	    btn = $('.inp-btn input').eq(0),
	    subjects,//影人作品
	    content = $('div.item'),
	    aside = $('div.aside'),
	    app = $('.app', '.db-global-nav'),
	    appMore = $('.more', app),
	    flip = $('.flipover');
	//豆瓣客户端的显示
		app.on('mouseenter', function(){
			appMore.css('display', 'block');
		}).on('mouseleave', function(){
			appMore.css('display', 'none');
		})
	//搜索框输出之后搜索动作
	
	btn.on('click', search);
	inp.on('keydown', function(e){
		if(e.keyCode === 13 && inp){
			search();
		};
	})
	//点击搜索按钮
	var search = function search(){
		$('.waiting').css('display', 'block');
		$userInput = inp.val();
		$.ajax({
			url:'http://api.douban.com/v2/movie/search?q=' + $userInput,
			data:'',
			type:'GET',
			dataType:'jsonp',
			success: getSub
		})
	}
	//点击之后获取影人作品
	var getSub = function getSub(json){
		$('.waiting').css('display', 'none');
		subjects = json.subjects;
		console.log(json);
		for(var i = 0, len = subjects.length; i < (len < 16 ? len : 15); i++){
			updateInfo(subjects[i], i);
		}
		flipOver({total: json.total, count: json.count, nowpage: 1, length: subjects.length});

	}

	//更新列表内容
	var updateInfo = function updateInfo(subject, index){
		content.eq(index).css('display', 'none');
		$('img.poster', content.eq(index)).attr('src', subject.images.small);
		$('a.name', content.eq(index)).html(subject.title).attr('href', subject.alt);
		$('span.canplay', content.eq(index)).html('[可播放]');
		$('p.pl', content.eq(index)).html(function(){
			var tmp = '',
				casts = subject.casts,
				directors = subject.directors,
				genres = subject.genres;

			tmp += subject.year;
			for(var i = 0, len = casts.length; i < len; i++){
				tmp += ' / ' + casts[i].name;
			}
			for(var i = 0, len = directors.lenght; i < len; i++){
				tmp += ' / ' + directors[i].name;
			}
			for(var i = 0, len = genres.length; i < len; i++){
				tmp += ' / ' + genres[i];
			}
			tmp += '...';
			return tmp;
		});
		$('span.rating-nums', content.eq(index)).html(subject.rating.average === parseInt(subject.rating.average) ? subject.rating.average + '.0' : subject.rating.average);
		$('span.star', content.eq(index)).attr('class', 'star star' + subject.rating.stars);
		$('span.pl', content.eq(index)).html(function(){
			return '(' + parseInt(Math.random() * 100000 + 5476) + '人评价)'
		})
		$('p.pl a', aside).eq(0).html('> 添加电影 '+$userInput);
		$('p.pl a', aside).eq(1).html('> 添加影人 '+$userInput);
		$('p.pl a', aside).eq(2).html('> 搜索"' + $userInput + '"的图书');
		$('p.pl a', aside).eq(3).html('> 搜索"' + $userInput + '"的音乐');
		$('p.pl a', aside).eq(4).html('> 搜索"' + $userInput + '"的舞台剧');
		content.eq(index).css('display', 'block');
		$('.wrapper').css('display', 'block');

	}

	//翻页组件
	var flipOver = function(json){
		flip.html('');
		var count = json.count,
			total = json.total,
			allpage,
			nowpage = json.nowpage,
			length = json.length,
			nowIndex = (nowpage - 1) * 15, //更新内容信息需要用到的标记
			len = length - nowIndex,
			frag = document.createDocumentFragment(),
			reg = /\d+$/;//取出a最后面的数字作为跳转标记
		allpage = parseInt(count / 15 + (count % 15 === 0 ? 0 : 1));
		//前页
		if(nowpage === 1){
			var prevpage = $('<span class="prev"><前页</span>')[0];
		}else{
			var prevpage = $('<a href = "#' + (allpage + 1) + '"><前页</a>')[0];
		}
		frag.appendChild(prevpage);
		//中间
		for(var i = 1; i <= allpage; i++){
			if(i === nowpage){
				frag.appendChild($('<span class="thispage">' + nowpage + '</span>')[0]);
			}else{
				frag.appendChild($('<a href = "#' + i + '">' + i + '</a>')[0]);
			}
		}
		//后页
		if(nowpage === allpage){
			var nextpage = $('<span class="next">后页></span>')[0];
		}else{
			var nextpage = $('<a href = "#' + (allpage + 2) + '">后页></a>')[0];
		}
		frag.appendChild(nextpage);
		//总共
		frag.appendChild($('<span class="count">(共' + total + '条，显示' + count + '条)</span>')[0]);
		$('a', $(frag)).on('click', function(){
			var num = parseInt(reg.exec(this.href));
			if(num === allpage + 1){
				nowpage--;
			}else if(num === allpage + 2){
				nowpage++;
			}else{
				nowpage = num;
			}
			json.nowpage = nowpage;
			flipOver(json);
			$("html,body").animate({scrollTop:$("#anchor").offset().top},500);
		});
		flip.html(frag);
		//更新内容信息
		for(var i = 0; i < (len < 16 ? len : 15); i++){
			updateInfo(subjects[nowIndex + i], i);
		}
		//若最后一页不够15个显示，隐藏后面的框架
		if(nowpage === allpage){
			for(var i = len; i <= 15; i++){
				content.eq(i).css('display', 'none');
				$('p.first', '.movie').eq(i).css('display', 'none');
			}
		}
	}
}())