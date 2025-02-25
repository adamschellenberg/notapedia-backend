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

public class UserProfileControllerTests
{
    private readonly ApplicationDbContext _context;
    private readonly Mock<UserManager<User>> _mockUserManager;
    private readonly UserProfileController _controller;

    public UserProfileControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;
        _context = new ApplicationDbContext(options);
        _mockUserManager = CreateMockUserManager();
        _controller = new UserProfileController(_mockUserManager.Object, _context);
    }

    [Fact]
    public async Task UpdateProfileImage_ShouldUpdateSuccessfully()
    {
        var user = new User { Id = "test-user-123", UserName = "TestUser", ProfileImage = "masquiti.png-follower"};
        _mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
        _mockUserManager.Setup(x => x.UpdateAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Success);

        var newProfileImage = "lioness-follower.png";

        var result = await _controller.UpdateProfileImage(
            new UserProfileController.UpdateProfileImageRequest 
            { 
                NewProfileImage = newProfileImage 
            });

        var okResult = Assert.IsType<OkObjectResult>(result);
        _mockUserManager.Verify(x => x.UpdateAsync(It.Is<User>(u => u.ProfileImage == newProfileImage)), Times.Once);

        Console.WriteLine($"UpdateProfilePicture Test  Passed! New profile picture: {newProfileImage}");
    }

    private static Mock<UserManager<User>> CreateMockUserManager()
    {
        var store = new Mock<IUserStore<User>>();
        return new Mock<UserManager<User>>(
            store.Object, null, null, null, null, null, null, null, null);
    }
}

public class UpdateProfileImageRequest
{
    public string NewProfileImage { get; set; }
}