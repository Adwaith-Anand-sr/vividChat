return (
	<>
		<main className="w-full h-screen bg-zinc-950 text-white">
			<div className="flex flex-col overflow-x-hidden overflow-y-auto">
				{requests.map(user => (
					<div
						key={user._id}
						className="w-full justify-between px-[5vw] h-[8vh] flex items-center text-white overflow-hidden">
						<img
							src={avatar}
							className="w-[5.5vh] h-[5.5vh] rounded-full border"
						/>
						<h1 className="text-[1rem] font-black">{user.username}</h1>
						<div className="flex gap-4 text-6xl">
							<Cancel
								className="text-red-600"
								onClick={rejectFriendRequest(user._id)}
							/>
							<CheckCircle className="text-green-500" />
						</div>
					</div>
				))}
			</div>
		</main>
	</>
);
