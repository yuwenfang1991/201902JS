let bannerRender = (function () {
	// 获取元素：
	let $container = $('#container'),
		$wrapper = $('.wrapper'),
		$focus = $('.focus'),
		$arrowLeft = $('.arrowLeft'),
		$arrowRight = $('.arrowRight'),
		$slideList = null,
		$focusList = null;

	// 轮播图基础参数
	let stepIndex = 0; // 记录当前要显示的图片的索引
	let autoTimer = null; // 记录自动轮播定时器id（因为我们后面还要鼠标放上去的时候停止轮播，停止轮播需要清除定时器，而清除定时器需要知道定时器id）
	let interval = 3000; // 自动轮播间隔，3000只是一个默认值，根据真实项目的需求调整；

	// queryData 获取数据
	function queryData(successFn, errorFn) {
		$.ajax({
			method: 'GET',
			url: 'json/banner.json',
			async: false,
			dataType: 'json',
			success: function (data) {
				// 这里就已经拿到数据了，data就是我们从服务端拿到的数据，并且jquery已经帮我们处理成对象了
				// 思考：我们在这里是不是就可以执行绑定数据的操作了
				successFn(data)
			},
			error: errorFn
		})
	}

	// bindHTML 绑定数据
	function bindHTML(data) {
		// 1. 设置slideStr、focusStr空字符串
		let slideStr = ``; // wrapper里面的图片
		let focusStr = ``; // 轮播图下面的小点点

		// 2. 遍历数据，拼接图片和焦点
		data.forEach((item, index) => {
			let {img, desc} = item;
			slideStr += `<div class="slide">
<img src="${img}" alt="${desc}">
</div>`;
			focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`
			// 默认第一个焦点时选中的，所以当index为0时表示第一个焦点
		});

		// 3. 为了实现无缝拼接，还需要把wrapper下的第一张图片复制一份到容器末尾，所以我们这里需要在slideStr末尾多拼接一份第一个
		slideStr += `<div class="slide">
<img src="${data[0].img}" alt="${data[0].desc}">
</div>`;

		// 4. 插入页面内
		$wrapper.html(slideStr);
		$focus.html(focusStr);

		// 5. 因为我们说jq获取的元素时静态集合，所以需要在绑定数据后再获取wrapper下的图片集合以及轮播图上的小焦点集合
		$slideList = $('.wrapper .slide');
		$focusList = $('.focus > li');

		// 6. 动态计算wrapper的宽度，$slideList有多少个，wrapper的宽度就应该有多少个图片的宽度（每个图片宽1000）
		$wrapper.css({
			width: $slideList.length * 1000
		})
	}

	// autoMove 控制轮播图自动轮播
	function autoMove() {
		// 1. 因为stepIndex记录的是当前展示的图片，所以轮播下一张需要先给stepIndex++
		stepIndex++;
		//到这里我们发现在stepIndex从0到4都正常轮播，但是当stepIndex变成5以后，就没有了。这是因为什么？因为stepIndex代表的是将要展示的图片索引。而这里图片的最大索引就是4（因为wrapper下有5个slider，其中最后一个是我们复制出来的第一张图）。到4说明就到最后一张了，如果再轮播就要播放第二张了。为了实现无缝轮播，当播放到最后一张后，stepIndex++就等于$slideList的length了，如果stepIndex >= $slideList.length 【因为$slideList下一共就5个，最大索引就是4啊~】，我们就把stepIndex设置成1【1是第二张图片的索引啊~】，同时把$wrapper的left值设置为0。
		if (stepIndex >= $slideList.length) {
			stepIndex = 1;
			$wrapper.finish().css({
				left: 0
			})
		}
		// 2. 让wrapper动起来实现轮播
		$wrapper.finish().animate({
			left: -stepIndex * 1000
		}, 200);
		changeFocus()
	}

	// changeFocus 处理轮播时焦点的问题
	function changeFocus() {
		// 当轮播图轮播时，下面的小焦点也要跟着动，
		// 当展示第一个时，第一个小点有选中样式（第一个小点的索引是0），
		// 当第二个图片展示时，我们需要选中第二个（第二个小点的索引是1），
		// 当第三个图片展示时，我们需要选中第三个（第二个小点的索引是2），
		// ....
		// 综上可以发现，stepIndex是不是就代表这当前轮播图的索引，这个索引应该和下面的小点是对应的。但是，但是，但是，当轮播到最后一张时，这最后一张时我们复制出来的第一个图，所以展示的是第一个图，对应着下面的小点应该选中第一个；
		let tempIndex = stepIndex; // stepIndex 记录的是当前正则展示的图片，控制着轮播顺序，所以我们不能随意修改它，而是应该另选一个tempIndex赋值一份stepIndex的值（基本数据类型复制的是值）
		if (tempIndex >= $slideList.length - 1) {
			tempIndex = 0;
		}
		$focusList.eq(tempIndex).addClass('active').siblings().removeClass('active')
	}

	// handleContainer 处理鼠标悬停在轮播图上时停止轮播，并且展示左右箭头
	function handleContainer() {
		$container.on('mouseenter', function () {
			// 停止轮播就是清除定时器
			clearInterval(autoTimer);
			// 将左右箭头设置为display: block
			$arrowLeft.css({
				display: 'block'
			});
			$arrowRight.css({
				display: 'block'
			});
		}).on('mouseleave', function () {
			// 重新启动轮播，即重新开启定时器
			autoTimer = setInterval(autoMove, interval);
			// 隐藏两个箭头
			$arrowLeft.css({
				display: 'none'
			});
			$arrowRight.css({
				display: 'none'
			});
			// 隐藏两个箭头简单写法
			// ;[$arrowLeft, $arrowRight].forEach(item => item.css({display: 'none'}));
		})
	}

	// handleArrow 点击箭头时切换轮播
	function handleArrow() {
		// 点击左面的箭头就是轮播上一张
		// 轮播上一张就是让stepIndex--，但是减到0的时候就说明到第一张了，再减就是-1了，而此时再播就该播最后一张了（真实图片的最后一张，而不是我们复制出来的那个第一张）；
		$arrowLeft.on('click', function () {
			stepIndex--;
			if (stepIndex < 0) {
				stepIndex = $slideList.length - 2;
			}
			$wrapper.finish().animate({
				left: -1 * stepIndex * 1000
			}, 200);
			changeFocus();
		});
		// 点击右面的箭头就是轮播下一张 和自动轮播的效果一样
		$arrowRight.on('click', autoMove);
	}


	// handleFocus 点击焦点切换轮播图；我们发现焦点的索引就是当前轮播的图片索引，所以我们直接将stepIndex设置为当前焦点的索引，并且让wrapper的left值动画到这个索引对应的值，
	function handleFocus() {
		$focusList.on('click', function () {
			let focusIndex = $(this).index();
			stepIndex = focusIndex; //
			$wrapper.finish().animate({
				left: -1 * focusIndex * 1000
			});
			changeFocus()
		})
	}


	return {
		init() {
			// 执行请求+绑定数据
			queryData(bindHTML);

			// 处理鼠标悬停时停止轮播+离开时重启自动轮播
			handleContainer();

			// 处理左右箭头的点击事件
			handleArrow();

			// 处理点击焦点切换轮播
			handleFocus();

			// 开启自动轮播；
			autoTimer = setInterval(autoMove, interval);
		}
	}
})();
bannerRender.init();