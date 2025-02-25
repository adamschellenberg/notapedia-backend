using Xunit;
using Moq;
using System;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Controllers;
using NotapediaAPI.Models;
using NotapediaAPI.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.InMemory;


public class UserCapturedNotamonControllerTests
{
    private readonly ApplicationDbContext _context;
    private readonly Mock<UserManager<User>> _mockUserManager;
    private readonly UserCapturedNotamonController _controller;

    public UserCapturedNotamonControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;
        _context = new ApplicationDbContext(options);
        _mockUserManager = CreateMockUserManager();
        _controller = new UserCapturedNotamonController(_context, _mockUserManager.Object);
    }

    [Fact]
    public async Task CaptureNotamon_ShouldAddNotamonToUserCollection()
    {
        var user = new User { Id = "test-user-123", UserName = "TestUser" };
        _mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
        _mockUserManager.Setup(x => x.UpdateAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Success);
        var notamonId = 1;

        var result = await _controller.CapturedNotamon(notamonId);
        var captured = await _context.UserCapturedNotamons.FirstOrDefaultAsync(c => c.UserId == user.Id && c.NotamonId == notamonId);

        Assert.NotNull(captured);
        Assert.Equal(notamonId, captured.NotamonId);
        
        Console.WriteLine($"CaptureNotamon Test Passed! Notamon {notamonId} added to user {user.UserName}");
    }

    private static Mock<UserManager<User>> CreateMockUserManager()
    {
        var store = new Mock<IUserStore<User>>();
        return new Mock<UserManager<User>>(
            store.Object, null, null, null, null, null, null, null, null);
    }
}